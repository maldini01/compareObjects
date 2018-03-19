module.exports = {
  differences: function (firstObject, secondObject) {
    var obj1 = JSON.stringify(firstObject);
    var obj2 = JSON.stringify(secondObject);
    var objDifferent = {};
    var index = 0;
    if (obj1 === obj2) {
      return {};
    } else {
      for (var propertyObject in firstObject) {
        if (Array.isArray(firstObject[propertyObject])){
          if (Array.isArray(secondObject[propertyObject])) {
            array(firstObject[propertyObject], secondObject[propertyObject], propertyObject);
          } else {
            objDifferent[propertyObject] = firstObject[propertyObject];
          }
        } else {
          if (firstObject[propertyObject] !== secondObject[propertyObject]) {
            objDifferent[propertyObject] = firstObject[propertyObject];
            // console.log('diferentes, object1:' +  firstObject[propertyObject] + ', object2: ' + secondObject[propertyObject]);
          }
        }
      }
      // console.log('diferencias entre los objetos', objDifferent);
      return objDifferent
    }
    function array(firstObject, secondObject, nameProperty) {
      // console.log('arrays', firstObject, secondObject);
      for (var i = 0; i < firstObject.length; i++) {
        // console.log('arrays', firstObject, firstObject[i])
        if (firstObject[i] === Object(firstObject[i])) {
          for (var propertyObject in firstObject[i]) {
            // console.log('si son objetos', firstObject[i], firstObject[i][propertyObject])
            if (Array.isArray(firstObject[i][propertyObject])){
              if (Array.isArray(secondObject[i][propertyObject])) {
                // console.log('hay otro arrayyy!');
                return array(firstObject[i][propertyObject], secondObject[i][propertyObject], propertyObject);
              } else {
                objDifferent[propertyObject] = firstObject[i][propertyObject];
              }
            } else {
              // console.log('diferencias arrays', firstObject[i][propertyObject], secondObject[i][propertyObject])
              if (firstObject[i][propertyObject] !== secondObject[i][propertyObject]) {
                objDifferent[propertyObject] = firstObject[i][propertyObject];
                // console.log('diferentes, object1:' +  firstObject[propertyObject] + ', object2: ' + secondObject[propertyObject]);
              }
            }
          }
        } else {
            console.log('no son objetos', firstObject, secondObject)
            if (firstObject[i] !== secondObject[i]) {
              if (objDifferent[nameProperty] === undefined){
                objDifferent[nameProperty] = [];
              }
                objDifferent[nameProperty].push(firstObject[i]);
                // console.log('diferentes, object1:' +  firstObject[propertyObject] + ', object2: ' + secondObject[propertyObject]);
            }
        }
      } 
      return false;
    }
  }
};