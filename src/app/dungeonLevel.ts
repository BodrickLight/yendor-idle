import { Room } from "./room";

export class DungeonLevel {
	constructor(public readonly level: number, private readonly rooms: Room []) {
		this.complete = false;
		this.currentRoomIdx = 0;
		this.roomNumber = this.currentRoomIdx + 1;
		this.currentRoom = this.rooms[this.currentRoomIdx];
		this.floorSize = rooms.length;
	}

	currentRoom?: Room;
	private currentRoomIdx: number;
	complete: boolean;

	floorSize: number;
	roomNumber: number;

	update() {
		if (this.complete || !this.currentRoom) {
			return;
		}

		if (!this.currentRoom.monster || this.currentRoom.monster.hp.current <= 0) {
			this.currentRoomIdx++;
			this.roomNumber = this.currentRoomIdx + 1;
			this.currentRoom = this.rooms[this.currentRoomIdx];
		}

		this.complete = this.currentRoomIdx >= this.rooms.length;
	}
}