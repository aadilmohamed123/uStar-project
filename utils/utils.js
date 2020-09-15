exports.randNumFunc = () => {
  return Math.floor(Math.random() * 10000);
};

exports.makeRefObj = (children) => {
  const lookUpObj = {};
  children.forEach(
    (child) =>
      (lookUpObj[child.child_id] = { [child.parent_email]: child.child_name })
  );
  return lookUpObj;
};

exports.formatData = (data, makeRefObj) => {};
