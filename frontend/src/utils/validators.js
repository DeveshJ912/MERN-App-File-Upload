class Validators {
    static amountPatternValidator = (name) => {
      const re = new RegExp(/[0-9.]$/);
      if (name) {
        if (!re.test(name)) {
          return false;
        }
      }
      return true;
    };
    static digitPatternValidator = (name) => {
      const re = new RegExp(/[0-9]$/);
      if (name) {
        if (!re.test(name)) {
          return false;
        }
      }
      return true;
    };
    static minValidator = (text, limit) => {
      
      let val = parseInt(text);
      if (val < limit) {
        return false;
      }
      return true;
    };
    static maxValidator = (text, limit) => {
      let val = parseInt(text);
      if (val > limit) {
        return false;
      }
      return true;
    };
    static mobileNumberLengthValidator = (mobile) => {
      if (mobile) {
        if (mobile.length > 10) {
          return false;
        }
      }
      return true;
    };
    static mobileNumberPatternValidator = (name) => {
      const re = new RegExp(/^[6-9]{1}[0-9]{9}$/);
      if (name) {
        if (!re.test(name)) {
          return false;
        }
      }
      return true;
    };
    static otpLengthValidator = (mobile) => {
      if (mobile) {
        if (mobile.length > 4) {
          return false;
        }
      }
      return true;
    };
    static otpPatternValidator = (name) => {
      const re = new RegExp(/[0-9]{4}$/);
      if (name) {
        if (!re.test(name)) {
          return false;
        }
      }
      return true;
    };
    static firstNameLengthValidator = (name, maxlength) => {
      if (name) {
        if (name.length > maxlength) {
          return false;
        }
      }
      return true;
    };
    static firstNamePatternValidator = (name) => {
      const re = new RegExp(/^[A-Za-z\s]+$/);
      if (name) {
        if (!re.test(name)) {
          return false;
        }
      }
      return true;
    };
    static emailLengthValidator = (email) => {
      if (email) {
        if (email.length > 255) {
          return false;
        }
      }
      return true;
    };
    static emailPatternValidator = (email) => {
      const re = new RegExp(/^[a-zA-Z0-9]([a-zA-Z0-9_-]|(\.(?!\.)))+[a-zA-Z0-9]@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,})+$/);
      if (email) {
        if (!re.test(email)) {
          return false;
        }
      }
      return true;
    };
  }
  
  export default Validators;
  