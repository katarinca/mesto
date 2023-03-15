export class UserInfo{
  constructor({nameSelector, jobSelector}) {
    this._profileName = document.querySelector(nameSelector);
    this._profileInfo = document.querySelector(jobSelector);
  }

  getUserInfo() {
   return {
    name: this._profileName.textContent,
    job: this._profileInfo.textContent
   };
  }

  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileInfo.textContent = data.job;
  }
}