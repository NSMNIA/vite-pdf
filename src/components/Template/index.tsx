
import pdf from "@react-pdf/renderer";
import { FC } from "react";
const { Document, Text, View, StyleSheet, Page, Image } = pdf;

const asEuro = (price: number) => {
    return price.toLocaleString('nl-NL', { style: 'currency', currency: 'EUR' });
};

const styles = StyleSheet.create({
    page: {
        padding: 24,
        paddingBottom: 108
        // positionRelative: 1,
    },
    header: {
        fontSize: 24,
    },
    header_logo: {
        width: 200,
        height: 100,
        marginRight: 20,
        marginBottom: 20,
        objectFit: 'contain',
        objectPosition: 'center',
    }
});

// @NOTE!!
// if a component has wrap={false}, and the component gets so large that it cannot fit on it's own page, then react-pdf will crash and freeze your entire web page!
// also note, that with wrap = true, you cannot currently use flex and flexBasis css properties, as they break when wrapping pages.

interface ITemplate {
    company: any;
}


export const Template: FC<ITemplate> = ({ company }) => {
    const header = (image: string | null, name: string) => {
        console.log(image);
        if (image === null) {
            return (
                <View fixed>
                    <Text>{name}</Text>
                </View>
            );
        }
        return (<View>
            <Image src={image} style={styles.header_logo} />
            <Text>{name}</Text>
        </View>)
    }

    return (
        <Document
            author="Power Innovations Sales Person"
            title="Sales Quote"
        >
            <Page size="LETTER" style={styles.page} wrap>
                {header(company?.company_image, company.company_name)}

            </Page>
        </Document>
    );
};

export default Template;
