import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';
import Template from './components/Template';

let company: any = {
    company_name: "Power Innovations",
    company_image: "/src/test-logo.png",
}


function App() {
    const [loaded, setLoaded] = useState<boolean>(false);
    const [pdf, setPdf] = useState<any>(<Template company={company} />);

    const getBase64FromUrl = async (url: string) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
    }

    useEffect(() => {
        if (company?.company_image) {
            getBase64FromUrl(company.company_image).then((base64data) => {
                if (base64data) {
                    company.company_image = base64data;
                    setPdf(<Template company={company} />);
                } else {
                    company.company_image = null;
                    setPdf(<Template company={company} />);
                }
                return setLoaded(true);
            })
        } else {
            return setLoaded(true);
        }
    }, [])

    if (!loaded) return <div>Loading...</div>;
    return (
        <div className="App">
            <PDFViewer>
                {pdf}
            </PDFViewer>

            <PDFDownloadLink
                document={pdf}
                fileName={"Quote" + new Date().getTime() + ".pdf"}
            >
                {({ blob, url, loading, error }) =>
                    loading ? "Loading . . ." : "Download"
                }
            </PDFDownloadLink>
        </div>
    )
}

export default App
