class Global {
  token = '';

  private _accessToken = '';

  get accessToken() {
    return this._accessToken;
  }

  set accessToken(accessToken: string) {
    this._accessToken = accessToken;
  }
}

export default new Global();
