import { makeAutoObservable, runInAction } from "mobx";

import { createContext } from "react";
import sample from "./data.json";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Location {
  locationID: number;
  name: string;
}

export interface Env {
  envID: number;
  name: string;
}

export interface Server {
  serverID: number;
  name: string;
  locationID: number;
  envID: number;
}

export class Store {
  isLoaded = false;
  locations: Location[] = [];
  envs: Env[] = [];
  servers: Server[] = [];
  locationID: number | null = null;
  envID: number | null = null;

  fetchData = async () => {
    await sleep(3000);
    runInAction(() => {
      this.locations = sample.locations;
      this.envs = sample.envs;
      this.servers = sample.servers;
      this.isLoaded = true;
    });
  };

  constructor() {
    makeAutoObservable(this);
  }
  setLocationID(id: number | null) {
    this.locationID = id;
  }
  setEnvID(id: number | null) {
    this.envID = id;
  }

  get filteredEnvs() {
    if (this.locationID === null) return [];
    const serversLocation = this.servers.filter(
      (s) => s.locationID === this.locationID
    );
    const envIDs = serversLocation.map((s) => s.envID);
    return this.envs.filter((e) => envIDs.includes(e.envID));
  }

  filteredServers(locationID: number | null, envID: number | null) {
    if (locationID === null || envID === null) return [];
    return this.servers.filter(
      (s) => s.locationID === locationID && s.envID === envID
    );
  }
  resetFilteredServers() {
    this.locationID = null;
    this.envID = null;
  }
  
}

export const store = new Store();
export const storeContext = createContext(store);
