import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Components } from '../entities/components.entity';
import { ILike, Repository } from 'typeorm';
import { CreateComponentsDTO } from '../dto/create.components.dto';
import { UsersService } from 'src/modules/users/domain/users.service';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Components)
    private readonly componentsRepository: Repository<Components>,
    private readonly userService: UsersService,
  ) {}

  async findAllComponents(): Promise<Components[]> {
    const components = await this.componentsRepository.find();

    if (!components.length)
      throw new HttpException('components.not.found', HttpStatus.NOT_FOUND);

    return components;
  }

  async createComponent(
    componentDTO: CreateComponentsDTO,
  ): Promise<CreateComponentsDTO> {
    const getUser = await this.userService.findByUserId(componentDTO.userId);

    if (!getUser) {
      throw new HttpException('user.not.found', HttpStatus.NOT_FOUND);
    }

    return await this.componentsRepository.save(componentDTO);
  }

  async Update(id: number, input: any): Promise<any> {
    const getComponent = await this.componentsRepository.findOne({
      where: { id },
    });

    if (!getComponent) {
      throw new HttpException('user.not.found', HttpStatus.NOT_FOUND);
    }

    return await this.componentsRepository.update(id, input);
  }

  async Delete(id: number): Promise<void> {
    const performance = await this.componentsRepository.findOne({
      where: { id: id },
    });

    if (!performance) {
      throw new HttpException('component.not.found', HttpStatus.NOT_FOUND);
    }

    await this.componentsRepository.remove(performance);
  }

  async FindByName(name: string): Promise<Components> {
    const getComponent = await this.componentsRepository.findOne({
      where: { name: ILike(`${name}`) },
    });

    if (!getComponent) {
      throw new HttpException('component.not.found', HttpStatus.NOT_FOUND);
    }

    return getComponent;
  }
}
