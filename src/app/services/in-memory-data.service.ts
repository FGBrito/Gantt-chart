import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
	createDb() {
		let	tasks = [
			{id: 1, text: 'Máquina 1', start_date: '2024-03-10 00:00', duration: 2, progress: 1},
			{id: 2, text: 'Troca de Óleo', start_date: '2024-03-10 00:00', duration: 2, progress: 1, parent: 1},
			{id: 3, text: 'Máquina 2', start_date: '2024-03-15 00:00', duration: 1, progress: 0},
			{id: 4, text: 'Limpeza Geral', start_date: '2024-03-15 00:00', duration: 1, progress: 0, parent: 3},
			{id: 5, text: 'Máquina 3', start_date: '2024-03-20 00:00', duration: 5, progress: 0.8},
			{id: 6, text: 'Reparo de Peça Avariada', start_date: '2024-03-20 00:00', duration: 5, progress: 0.8, parent: 5}
		];
		let links = [
			{id: 1, source: 1, target: 2, type: '0'}
		];
		return {tasks, links};
	}
}
