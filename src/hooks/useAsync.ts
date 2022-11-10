import { AxiosError, AxiosResponse } from "axios";
import { DependencyList, useEffect, useReducer } from "react";

import { httpClient } from "../api/api";
import { SickServiceImp } from "../api/SickService";

export type AsyncData = AxiosResponse<any, any> | null;
export type AsyncError = AxiosError | Error | null | boolean;

export type RequestState = {
  loading: boolean;
  data: AsyncData;
  error: AsyncError;
};

export type Action =
  | { type: "LOADING" }
  | { type: "SUCCESS"; data: AsyncData }
  | { type: "ERROR"; error: AsyncError };

type Cache = Record<string, AsyncData>;

const cache: Cache = {};

function asyncReducer(state: RequestState, action: Action): RequestState {
  switch (action.type) {
    case "LOADING":
      return {
        loading: true,
        data: null,
        error: null,
      };
    case "SUCCESS":
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    case "ERROR":
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    default:
      throw new Error(`Unhandled action type`);
  }
}

const initialState: RequestState = {
  loading: false,
  data: null,
  error: false,
};

const sickService = new SickServiceImp(httpClient);

export const useSickAsync = (
  value: string,
  deps: DependencyList
): [RequestState, () => Promise<void>] => {
  const [state, dispatch] = useReducer(asyncReducer, initialState);
  const fetchData = async () => {
    dispatch({ type: "LOADING" });
    try {
      // TODO: 로컬 캐싱 기능 구현하기
      if (cache[value]) {
        const data = cache[value];
        dispatch({ type: "SUCCESS", data });
      } else {
        const data = await sickService.getSickList({ q: value });
        dispatch({ type: "SUCCESS", data });
      }
    } catch (e: any) {
      dispatch({ type: "ERROR", error: e });
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return [state, fetchData];
};
