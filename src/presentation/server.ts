import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
//import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";
import { CronService } from "./plugin/cron.plugin";

// const fileSystemLogRepository = new LogRepositoryImpl(
//     new FileSystemDatasource(),
//     );

const logRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
    );
const emailService = new EmailService();
export class Server {
    public static start(){
        console.log("server started");

        //! SEND EMAIL
        //const emailService = new EmailService( fileSystemLogRepository);
        //const emailService = new EmailService();
        
        //! USE CASES
        //new SendEmailLogs(emailService, fileSystemLogRepository).execute('shendrakgon@gmail.com');

        // emailService.sendEmail({
        //     to: 'shendrakgon7@gmail.com',
        //     subject: 'System\'s logs',
        //     htmlBody: ` <h3> Systems's logs`
        // })
        
        //emailService.sendEmailWithFileSystemLogs('shendrakgon7@gmail.com');


        CronService.createJob('*/10 * * * * *',
        () =>{
            const url = 'https://google.com';
            new CheckService(
                logRepository,
                () => console.log(` ${ url } is ok`),
                ( error ) => console.log(error),
            ).execute(url);
        }
        );

        
    }
}

