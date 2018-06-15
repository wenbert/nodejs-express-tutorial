
function goodreadsService() {
  function getBookById() {
    return new Promise(((resolve, reject) => {
      resolve({ description: 'our description' });
    }));
  }

  return { getBookById };
}

module.exports = goodreadsService();
