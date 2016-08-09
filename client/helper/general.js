// function to update save loader status if package is available
updateSaveButton = function (type) {
  if (! SaveLoader) return;
  SaveLoader.saveAction(type); // requires save-loader package
};
