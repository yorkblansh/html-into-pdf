import { PDFOptions } from 'puppeteer';
interface Props {
    /**
     * path to html file
     */
    templateHtml: string;
    /**
     * passed variables
     */
    variables: any;
    /**
     * PDFOptions
     */
    options?: PDFOptions;
}
export declare const htmlIntoPdf: (props: Props) => Promise<void>;
export {};
