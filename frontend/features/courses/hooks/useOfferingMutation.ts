"use client";

import { useState } from "react";

import { OfferingService } from "@/features/courses";
import type { CreateCourseOfferingRequest, UpdateCourseOfferingRequest } from "@/features/courses";
import { useError } from "@/shared";

export function useOfferingMutation(refresh: () => Promise<void>) {
  const { handleError } = useError();
  const [loading, setLoading] = useState(false);

  async function execute<T>(callback: () => Promise<T>): Promise<T> {
    try {
      setLoading(true);

      const result = await callback();

      await refresh();

      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function createOffering(data: CreateCourseOfferingRequest) {
    return execute(() => OfferingService.createOffering(data));
  }

  async function updateOffering(id: number, data: UpdateCourseOfferingRequest) {
    return execute(() => OfferingService.updateOffering(id, data));
  }

  return {
    loading,
    createOffering,
    updateOffering,
  };
}
