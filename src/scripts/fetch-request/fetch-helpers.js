class _FetchHelpers {
  constructor() {
    if (_FetchHelpers.instance == null) {
      _FetchHelpers.instance = this;
    }
    return _FetchHelpers.instance;
  }
  async getJSONResponse(path, params={}) {
    const response = await fetch(path, params);
    const responseJSON = await response.json();
    return responseJSON;
  }
}

const FetchHelpers = new _FetchHelpers();
Object.freeze(FetchHelpers);
export default FetchHelpers;
