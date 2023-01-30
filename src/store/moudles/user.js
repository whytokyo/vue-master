import {login} from '@/api/login'
import {defineStore} from "pinia";
import {Session} from "../../utils/storage.js";


const useUserStore = defineStore(
    'user',
    {
        actions: {
            // 登录
            login(userInfo) {
                const username = userInfo.username.trim();
                const password = userInfo.password;
                return new Promise((resolve, reject) => {
                    login(username, password).then((res) => {
                        Session.set('token', res.data.data.token)
                        resolve('');
                    }).catch(error => {
                        reject(error);
                    })
                })
            }
        }
    }
)

export default useUserStore
