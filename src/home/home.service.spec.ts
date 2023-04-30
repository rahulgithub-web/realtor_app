import { Test, TestingModule } from '@nestjs/testing';
import { PropertyType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { HomeService } from './home.service';

const mockGetHomes = [{
  id: 1,
  address: "115A Brahma",
  city: "Bangalore",
  price: "7878",
  propertyType: PropertyType.RESIDENTIAL,
  image: "img1",
  numberOfBedrooms: 4,
  numberOfBathrooms: 2,
  images: [{
    url: "src1"
  }]
}]

describe('HomeService', () => {
  let service: HomeService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HomeService, {
        provide: PrismaService,
        useValue: {
          home: {
            findMany: jest.fn().mockReturnValue(mockGetHomes)
          }
        }
      }],
    }).compile();

    service = module.get<HomeService>(HomeService);
    prismaService = module.get<PrismaService>(PrismaService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("getHomes", () => {

    const filters= {
      city: "Bangalore",
      price: {
        gte: 120000,
        lte: 100000
      },
      propertyType: PropertyType.RESIDENTIAL,
    }
    it("check for the different input", async () => {
      const mockPrismaFindManyHomes = jest.fn().mockReturnValue(mockGetHomes)

      jest.spyOn(prismaService.home, "findMany").mockImplementation(mockPrismaFindManyHomes)

      await service.getHomes(filters)

      expect(mockPrismaFindManyHomes).toBeCalledWith({
        select: {
          images: {
            select: {
              url: true,
            },
            take: 1,
          },
        },
        where:filters
      })
    })
  })
});
