export const menuItems = [
  {
    id: "1",
    label: "Category Form",
  },
  {
    id: "2",
    label: "Product Form",
  },
  {
    id: "3",
    label: "Blog Form",
  },
];

export const forms = (state) => {
  return {
    1: '<category-form></category-form>',
    2: `<product-form categories='${JSON.stringify(
      state.categories
    )}'></product-form>`,
    3: '<blog-form></blog-form>',
  };
};
