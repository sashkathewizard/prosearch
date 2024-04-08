import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3, S3Client} from "@aws-sdk/client-s3";
import * as process from "process";

@Injectable()
export class S3Service {
    private logger = new Logger(S3Client.name)
    private region: string;
    private s3: S3Client;

    constructor(private configService: ConfigService){
        this.region = String(process.env.S3_REGION) || 'eu-west-2'
        this.s3 = new S3Client({
            region: this.region,
            credentials: {
                secretAccessKey: String(process.env.S3_SECRET_ACCESS_KEY),
                accessKeyId: String(process.env.S3_ACCESS_KEY)
            }
        });

    }
    async uploadFile(file: Express.Multer.File, key: string){
        console.log(key + 'this is a key');
        console.log(this.s3);
        const bucket = String(process.env.S3_BUCKET) || 'default-bucket';
        console.log(bucket)

        const input: PutObjectCommandInput = {
            Body: file.buffer,
            Bucket: bucket,
            Key: key,
            ContentType: file.mimetype,
            ACL: 'public-read'
        };
        try {
            const responce: PutObjectCommandOutput = await this.s3.send(
                new PutObjectCommand(input),
            );
            if(responce.$metadata.httpStatusCode === 200){
                return `https://${bucket}.s3.${this.region}.amazonaws.com/${key}`;
            }
        }catch (e){
            this.logger.error('Cannot save file inside s3');
            throw e;
        }
    }
}

