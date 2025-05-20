import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Territory } from './entities/territory.entity';

@Injectable()
export class TerritoriesService {
  constructor(
    @InjectRepository(Territory)
    private readonly territoryRepo: Repository<Territory>,
  ) {}

  // Get all territories
  async findAll(): Promise<Territory[]> {
    return this.territoryRepo.find({ relations: ['parent'] });
  }

  // Find one territory
  async findOne(id: number): Promise<Territory> {
    const terr = await this.territoryRepo.findOne({ where: { id } });
    if (!terr) throw new NotFoundException('Territory not found');
    return terr;
  }

  // Create a territory
  async create(data: Partial<Territory>): Promise<Territory> {
    const territory = this.territoryRepo.create(data);
    return this.territoryRepo.save(territory);
  }

  // Update
  async update(id: number, data: Partial<Territory>): Promise<Territory> {
    await this.territoryRepo.update(id, data);
    return this.findOne(id);
  }

  // Delete
  async remove(id: number): Promise<void> {
    await this.territoryRepo.delete(id);
  }
}
