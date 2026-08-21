"use client";

import { useCallback, useEffect, useState } from "react";

import { type Lecturer, useError } from "@/shared";

import { OfferingService } from "../api/offering.service";
import type { AssignOfferingLecturerRequest } from "../types";

export function useOfferingLecturers(offeringId: number) {
  const { handleError } = useError();

  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [loading, setLoading] = useState(true);
  const [assigning, setAssigning] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLecturers = useCallback(async () => {
    if (!offeringId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await OfferingService.getLecturers(offeringId);

      setLecturers(response.data);
    } catch (error) {
      handleError(error);

      setError(error instanceof Error ? error.message : "Unable to load lecturers.");
    } finally {
      setLoading(false);
    }
  }, [offeringId, handleError]);

  const assignLecturer = async (data: AssignOfferingLecturerRequest) => {
    try {
      setAssigning(true);
      setError(null);

      await OfferingService.assignLecturer(offeringId, data);
      await loadLecturers();
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setAssigning(false);
    }
  };

  const removeLecturer = async (userId: number) => {
    try {
      setRemoving(true);
      setError(null);

      await OfferingService.removeLecturer(offeringId, userId);
      await loadLecturers();
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setRemoving(false);
    }
  };

  useEffect(() => {
    if (!offeringId) {
      return;
    }

    let cancelled = false;

    const fetchLecturers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await OfferingService.getLecturers(offeringId);

        if (!cancelled) {
          setLecturers(response.data);
        }
      } catch (error) {
        if (!cancelled) {
          handleError(error);

          setError(error instanceof Error ? error.message : "Unable to load lecturers.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchLecturers();

    return () => {
      cancelled = true;
    };
  }, [offeringId, handleError]);

  return {
    lecturers,
    loading,
    assigning,
    removing,
    error,
    refresh: loadLecturers,
    assignLecturer,
    removeLecturer,
  };
}
