import { LogType } from "src/app/logType";

export interface LogMessage {
	message: string;
	type: LogType;
}