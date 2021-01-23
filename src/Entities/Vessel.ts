import {
	BaseEntity,
	Column,
	Entity,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";

@Entity({
	name: "ships",
})
export class Ship extends BaseEntity {
	@PrimaryColumn()
	email!: string;

	@Column({ type: "text", nullable: false })
	name!: string;

	@Column({ type: "float", nullable: false })
	latitude!: number;

	@Column({ type: "float", nullable: false })
	longitude!: number;

	@Column({ type: "float", nullable: false })
	heading!: number;

	@Column({ type: "float", nullable: false })
	speed!: number;

	@UpdateDateColumn()
	lastUpdated: Date;
}
