exports.randNumFunc = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

exports.makeRefObj = (children) => {
  const lookUpObj = {};
  children.forEach((child) => {
    if (lookUpObj[child.parent_email]) {
      lookUpObj[child.parent_email].push({
        [child.child_name]: child.child_id,
      });
    } else {
      lookUpObj[child.parent_email] = [{ [child.child_name]: child.child_id }];
    }
  });
  return lookUpObj;
};

exports.formatData = (data, lookupObj) => {
  return data.map((entry) => {
    const newEntry = { ...entry };
    const { parent_email, child_name } = newEntry;

    newEntry.child_id = lookupObj[parent_email].find(
      (childObj) => child_name === Object.keys(childObj)[0]
    )[[child_name]];

    delete newEntry.child_name;
    delete newEntry.parent_email;
    return newEntry;
  });
};
