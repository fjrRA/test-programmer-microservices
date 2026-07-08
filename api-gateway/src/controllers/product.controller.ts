import type {
  Request,
  Response,
} from "express";

import {
  requestMasterService,
} from "../services/master-client.service";

export async function getProducts(
  _request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestMasterService(
      "/products",
    );

  response.status(200).json(result);
}

export async function getProductById(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestMasterService(
      `/products/${request.params.id}`,
    );

  response.status(200).json(result);
}

export async function createProduct(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestMasterService(
      "/products",
      {
        method: "POST",
        body: request.body,
      },
    );

  response.status(201).json(result);
}

export async function updateProduct(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestMasterService(
      `/products/${request.params.id}`,
      {
        method: "PUT",
        body: request.body,
      },
    );

  response.status(200).json(result);
}

export async function deleteProduct(
  request: Request,
  response: Response,
): Promise<void> {
  const result =
    await requestMasterService(
      `/products/${request.params.id}`,
      {
        method: "DELETE",
      },
    );

  response.status(200).json(result);
}