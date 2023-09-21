/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../../common";

export interface IProtoRandomNFTInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "getChanceArray"
      | "getInitialized"
      | "getNftTokenUris"
      | "getPropsFromModdedRng"
      | "getTokenCounter"
      | "requestNft"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getChanceArray",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInitialized",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNftTokenUris",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPropsFromModdedRng",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getTokenCounter",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "requestNft",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "getChanceArray",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInitialized",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNftTokenUris",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPropsFromModdedRng",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTokenCounter",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "requestNft", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
}

export interface IProtoRandomNFT extends BaseContract {
  connect(runner?: ContractRunner | null): IProtoRandomNFT;
  waitForDeployment(): Promise<this>;

  interface: IProtoRandomNFTInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  getChanceArray: TypedContractMethod<[], [[bigint, bigint, bigint]], "view">;

  getInitialized: TypedContractMethod<[], [boolean], "view">;

  getNftTokenUris: TypedContractMethod<[index: BigNumberish], [string], "view">;

  getPropsFromModdedRng: TypedContractMethod<
    [moddedRng: BigNumberish],
    [bigint],
    "view"
  >;

  getTokenCounter: TypedContractMethod<[], [bigint], "view">;

  requestNft: TypedContractMethod<[], [bigint], "payable">;

  withdraw: TypedContractMethod<[], [void], "nonpayable">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "getChanceArray"
  ): TypedContractMethod<[], [[bigint, bigint, bigint]], "view">;
  getFunction(
    nameOrSignature: "getInitialized"
  ): TypedContractMethod<[], [boolean], "view">;
  getFunction(
    nameOrSignature: "getNftTokenUris"
  ): TypedContractMethod<[index: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getPropsFromModdedRng"
  ): TypedContractMethod<[moddedRng: BigNumberish], [bigint], "view">;
  getFunction(
    nameOrSignature: "getTokenCounter"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "requestNft"
  ): TypedContractMethod<[], [bigint], "payable">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[], [void], "nonpayable">;

  filters: {};
}
