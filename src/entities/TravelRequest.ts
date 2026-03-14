import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";


export enum Status {
  PENDING = "pendente",
  APPROVED = "aprovado",
  REJECTED = "rejeitado",
  CANCELLED = "cancelado",
}

@Entity("travel_requests")
export class TravelRequest {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.travelRequests)
  @JoinColumn({name: "user_id"})
  user!: User

  @Column({ length: 50 })
  destination!: string;

  @Column({type: "date"})
  departureDate!: Date;

  @Column({type: "date"})
  returnDate!: Date;

  @Column({type: "date"})
  overTimeStart!: Date

  @Column({type: "date"})
  overTimeEnd!: Date

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING
  })
  status!: Status;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}
