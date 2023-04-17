import { HttpException } from '@nestjs/common';

export async function getPaginatedResponse({
  limit,
  page,
  callback,
  itemsCount,
}: {
  limit: number;
  page: number;
  callback: (take: number, skip: number) => any;
  itemsCount: number;
}) {
  const take = limit ? limit : undefined;
  const skip = page && limit ? (page - 1) * limit : undefined;
  const response = await callback(take, skip);

  const pagesCount = Math.ceil(itemsCount / limit);
  const pageToReturn = page ? page : 1;
  if (page <= 0 || page > pagesCount) {
    throw new HttpException('This page does not exists', 404);
  }
  return {
    itemsCount,
    pagesCount,
    page: pageToReturn,
    data: response,
  };
}
