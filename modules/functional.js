module.exports = {
    replaceTemplate: (template, item) => {
        let output = template.replaceAll("{%PRODUCT_NAME%}", item.productName);
        output = output.replaceAll("{%IMAGE%}", item.image);
        output = output.replaceAll("{%QUANTITY%}", item.quantity);
        output = output.replaceAll("{%PRICE%}", item.price);
        output = output.replaceAll("{%ID%}", item.id);
        output = output.replaceAll("{%FROM_WHERE%}", item.from);
        output = output.replaceAll("{%NUTRIENTS%}", item.nutrients);
        output = output.replaceAll("{%DESCRIPTION%}", item.description);
        if (!item.organic) {
            output = output.replaceAll("{%NOT_ORGANIC%}", "not-organic");
        }
        return output;
    },
};
