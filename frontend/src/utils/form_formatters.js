
class FormFormatters {
    static digitOnly = ( maxLength, cropZero = false) => {
      return (event) => {
  
          const initialValue = event.target.value;
          let newValue = initialValue;
  
          if (cropZero) {
              newValue = initialValue.replace(/^0(0+)?/g, '0');
          }
          newValue = newValue.replace(/[^0-9]*/g, '');
  
          if (maxLength && newValue.length > maxLength) {
              newValue = newValue.substring(0, maxLength);
          }
          event.target.value = newValue;
  
          if (initialValue !== event.target.value) {
              event.stopPropagation();
          }
      }
    };
    static alphaOnly = ( maxLength, upperOnly = false) => {
      return (event) => {
  
          const initialValue = event.target.value;
          let newValue = initialValue;
  
          newValue = newValue.replace(/[^a-zA-Z]*/g, '');
  
          if (maxLength && newValue.length > maxLength) {
              newValue = newValue.substring(0, maxLength);
          }
          if (upperOnly) newValue = newValue.toUpperCase();
          event.target.value = newValue;
  
          if (initialValue !== event.target.value) {
              event.stopPropagation();
          }
      }
    };
    static alphaWithSpaces = ( maxLength) => {
      return (event) => {
  
          const initialValue = event.target.value;
          let newValue = initialValue;
  
          newValue = newValue.replace(/^\s/g, '');
          newValue = newValue.replace(/[^a-zA-Z\s]*/g, '');
          newValue = newValue.replace(/\s\s/g, ' ');
  
          if (maxLength && newValue.length > maxLength) {
              newValue = newValue.substring(0, maxLength);
          }
          event.target.value = newValue;
  
          if (initialValue !== event.target.value) {
              event.stopPropagation();
          }
      }
    };
    static alphaNumericOnly = ( maxLength, upperOnly = false) => {
      return (event) => {
  
          const initialValue = event.target.value;
  
          let newValue = initialValue;
  
          newValue = newValue.replace(/[^0-9a-zA-Z]*/g, '');
  
          if (maxLength && newValue.length > maxLength) {
              newValue = newValue.substring(0, maxLength);
          }
          if (upperOnly) newValue = newValue.toUpperCase();
          event.target.value = newValue;
  
          if (initialValue !== event.target.value) {
              event.stopPropagation();
          }
      }
    };
    static alphaNumericWithSpecialsAndSpaceOnly = ( maxLength, upperOnly = false) => {
      return (event) => {
  
          const initialValue = event.target.value;
          let newValue = initialValue;
  
          newValue = newValue.replace(/^\s/g, '');
          newValue = newValue.replace(/[^0-9a-zA-Z.,;:&@\_\[\](){}\/\\'\-\s]*/g, '');
          newValue = newValue.replace(/\s\s/g, ' ');
  
          if (maxLength && newValue.length > maxLength) {
              newValue = newValue.substring(0, maxLength);
          }
          if (upperOnly) newValue = newValue.toUpperCase();
          event.target.value = newValue;
  
          if (initialValue !== event.target.value) {
              event.stopPropagation();
          }
      }
    };
  }
  export default FormFormatters;
  
  