export default function getCategoryMap(appConfig, categoryList) {
  const categories = {};
  if (categoryList && appConfig.categories && appConfig.categories.list
    && appConfig.categories.category) {
    for (let i = 0; i < categoryList.length; i += 1) {
      if (appConfig.categories.list.includes(categoryList[i])) {
        categories[categoryList[i]] = appConfig.categories.category[categoryList[i]];
      }
    }
  }
  return categories;
}
