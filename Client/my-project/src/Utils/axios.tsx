import axios, {AxiosRequestConfig} from "axios";
import { baseUrl } from "../Routes/routes";


interface AxiosConfig extends AxiosRequestConfig{
 baseUrl:string
}

const instance=axios.create({
baseURL:"http://localhost:4000/",
headers:{
    'Content-Type': 'application/json',
},


} as AxiosConfig)

instance.interceptors.request.use(
    (config) => {
        let userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            let firstLogin = JSON.parse(userDetails);
            const accesstoken = firstLogin.accesstoken;
            if (accesstoken) {
                config.headers.Authorization = `Bearer ${accesstoken}`;
            }
        }
        return config;
    }
);


instance.interceptors.response.use(
    (response)=> response,
    async(error)=>{
        const originalRequest=error.config;
        if(error.response.status=== 401 && !originalRequest._retry){
            originalRequest._retry=true;

            try{
                let userDetails = localStorage.getItem('userDetails');
                let firstLogin;
                if(userDetails){
                    firstLogin = JSON.parse(userDetails);
                    const refreshtoken=firstLogin.refrshtoken
                    const response = await axios.post('http://localhost:4000/refresh', { refreshtoken });
                    console.log(response)  
                }
             
                // localStorage.setItem('acesstoken', token);
            }catch(error){
                console.log(error)
            }

        }
    }

    
)

export default instance