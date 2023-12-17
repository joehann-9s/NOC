import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./plugin/cron.plugin";

export class Server {
    public static start(){
        console.log("server started");
        CronService.createJob('*/10 * * * * *',
        () =>{
            const url = 'https://google.com';
            new CheckService(
                () => console.log(` ${ url } is ok`),
                ( error ) => console.log(error),
            ).execute(url);
            console.log('You will see this message ever second');
        },);

        
    }
}

