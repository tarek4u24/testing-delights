class DataGeneration {
  static generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  static generateRandomID(length) {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  /**
   * Generates a random post body object with title, body, and userId.  
   * @returns Random Post Body
   */
  static randomPostBody() {
    return {
      title: this.generateRandomString(10),
      body: this.generateRandomString(50),
      userId: parseInt(this.generateRandomID(2))
    };
  }
}
export default DataGeneration;