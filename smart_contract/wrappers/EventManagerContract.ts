import { SendMode, Contract, ContractProvider, Sender, Address, Cell, beginCell, Slice, Dictionary, contractAddress } from '@ton/core';
import { Certificate, certificateConfigToCell } from './Certificate';

export type EventManagerConfig = {
    id: number;
    owner_address: Address;
    // identity_dict: any;
    certificates_dict: Dictionary<number, Certificate>;
    max_certificates: number;

};

const Opcodes = {
    mintCertificate: 0x738610cc,
}
export function eventManagerConfigToCell(config: EventManagerConfig): Cell {
    return beginCell().storeUint(config.id, 32)
        .storeUint(config.max_certificates, 32)
        .storeAddress(config.owner_address)
        .storeDict(config.certificates_dict)
        .endCell();
}
export class EventManagerContract implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) { }

    static createForDeploy(code: Cell, initialData: Cell): EventManagerContract {
        return new EventManagerContract(Address.parseRaw('0:0'), { code, data: initialData });
    }
    static createFromConfig(config: EventManagerConfig, code: Cell, workchain = 0) {
        const data = eventManagerConfigToCell(config);
        const init = { code, data };
        return new EventManagerContract(contractAddress(workchain, init), init);
    }
    static createFromAddress(address: Address) {
        return new EventManagerContract(address);
    }

    async sendVerifyIdentity(provider: ContractProvider, via: Sender, identityData: Cell) {
        await provider.internal(via, {
            value: '0.01', // 0.01 TON for gas
            body: beginCell()
                .storeUint(1, 32) // op: verify_identity
                .storeRef(identityData)
                .endCell(),
        });
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
    async sendCreateEvent(
        provider: ContractProvider,
        via: Sender,
        params: {
            eventId: string;
            startTime: number;
            endTime: number;
            maxParticipants: number;
            ticketPrice: bigint;
            metadata: Cell;
        }
    ) {
        await provider.internal(via, {
            value: '0.02', // 0.02 TON for gas
            body: beginCell()
                .storeUint(2, 32) // op: create_event
                .storeAddress(Address.parse(params.eventId))
                .storeUint(params.startTime, 64)
                .storeUint(params.endTime, 64)
                .storeUint(params.maxParticipants, 16)
                .storeCoins(params.ticketPrice)
                .storeRef(params.metadata)
                .endCell(),
        });
    }

    async sendMintCertificate(
        provider: ContractProvider,
        via: Sender,
        params: {
            recipient: Address;
            name: string;
        }
    ) {
        await provider.internal(via, {
            value: '0.05', // 0.05 TON for gas
            body: beginCell()
                .storeUint(Opcodes.mintCertificate, 32) // op: mint_certificate
                .storeAddress(params.recipient)
                .storeStringTail(params.name)
                .endCell(),
        });
    }

    async getID(provider: ContractProvider) {
        const result = await provider.get('get_id', []);
        return result.stack.readNumber();
    }
}
