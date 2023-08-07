function indexes(source, find) {
    if (!source) {
      return [];
    }
    // if find is empty string return all indexes.
    if (!find) {
      // or shorter arrow function:
      // return source.split('').map((_,i) => i);
      return source.split('').map(function(_, i) { return i; });
    }
    var result = [];
    for (i = 0; i < source.length; ++i) {
      // If you want to search case insensitive use 
      // if (source.substring(i, i + find.length).toLowerCase() == find) {
      if (source.substring(i, i + find.length) == find) {
        result.push(i);
      }
    }
    return result;
}