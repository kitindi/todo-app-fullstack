// using es6 module export 

   const getDate = function (){
      let day = new Date()
      let options = {
          weekday:'long',
          year:'numeric',
          day:'numeric',
          month:'long'
      }
     
 return day.toLocaleDateString('en-US', options)
  }

  module.exports = getDate;