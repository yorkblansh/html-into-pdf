import puppeteer, { PDFOptions } from 'puppeteer'
import * as handlebars from 'handlebars'

interface Props {
	/**
	 * path to html file
	 */
	templateHtml: string

	/**
	 * passed variables
	 */
	variables: any

	/**
	 * PDFOptions
	 */
	options?: PDFOptions
}

const _convert = async ({ templateHtml, variables, options }: Props) => {
	const template = handlebars.compile(templateHtml)
	const finalHtml = encodeURIComponent(template(variables))

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true
	})
	const page = await browser.newPage()
	await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
		waitUntil: 'networkidle0'
	})
	await page.pdf(options)
	await browser.close()
}

export const htmlIntoPdf = async (props: Props) => {
	try {
		_convert(props)
	} catch (error) {
		console.log({ error })
	}
}
