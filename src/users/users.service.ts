import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create.user.dto';
import { UpdateUserDto } from './dto/update.user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }

  async findOneUser(id: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<Users> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    return user;
  }

  create(dto: CreateUserDto): Promise<Users> {
    const user = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async update(id: string, dto: UpdateUserDto): Promise<Users> {
    const user = await this.findOneUser(id);
    Object.assign(user, dto);
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const userToDelete = await this.userRepository.delete(id);

    if (userToDelete.affected === 0) {
      throw new NotFoundException(`Quote with ID: ${id} not found.`);
    }
  }
}
