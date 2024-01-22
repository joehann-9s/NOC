import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./plugin/cron.plugin";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    );

export class Server {
    public static start(){
        console.log("server started");

        // send email
        
        // CronService.createJob('*/10 * * * * *',
        // () =>{
        //     const url = 'https://google.com';
        //     new CheckService(
        //         fileSystemLogRepository,
        //         () => console.log(` ${ url } is ok`),
        //         ( error ) => console.log(error),
        //     ).execute(url);
        // }
        // );

        
    }
}

