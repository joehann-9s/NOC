import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
//import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasources/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";
import { CronService } from "./plugin/cron.plugin";

// const fileSystemLogRepository = new LogRepositoryImpl(
//     new FileSystemDatasource(),
//     );

const fsLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource(),
    );
const mongoLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource(),
)
const postgresLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource(),
)
// const logRepository = new LogRepositoryImpl(
//     //new MongoLogDatasource(),
//     new PostgresLogDatasource(),
//     );
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
            new CheckServiceMultiple(
                [fsLogRepository, mongoLogRepository, postgresLogRepository],
                () => console.log(` ${ url } is ok`),
                ( error ) => console.log(error),
            ).execute(url);
        }
        );

        
    }
}

