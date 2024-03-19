import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TaskService } from '../services/task.service';
import { LinkService } from '../services/link.service';
import { Locale } from '../services/locale';
import { Task } from '../models/task';
import { Link } from '../models/link';

import { gantt } from 'dhtmlx-gantt';

@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'gantt',
	styleUrls: ['./gantt.component.css'],
	providers: [TaskService, LinkService],
	templateUrl: './gantt.component.html',
})
export class GanttComponent implements OnInit {
	@ViewChild('gantt_here', { static: true }) ganttContainer!: ElementRef;

	constructor(private taskService: TaskService, private linkService: LinkService) { }
	public mq: any = [];
	public selectedMac = "";
	public selectedStatus = "";
	public dataTaskrecover={
		data: [],
		links: []
	};

	ngOnInit() {
		gantt.config.drag_move = true;
		gantt.config.date_format = '%Y-%m-%d %H:%i';
		gantt.config.grid_width = 580;
		gantt.locale.date = Locale().date;
		gantt.locale.labels = Locale().labels;
		
		gantt.config.columns=[
			{name:"text",       label:"Descrição",  tree:true, align: "left"},
			{name:"start_date", label:"Inicio", align: "center" },
			{
				name: "progress", label: "Progresso", align: "center", width: 100,
				template: function (item: any) {
					if (item.progress >= 1){
						gantt.templates.grid_row_class = function(start, end, task){
							return  'concluded';
						};
						gantt.getTask(item.id).color = "green"
						gantt.templates.task_class = function(start, end, task){return "concluded";};
						return "Concluído";
					}
					if (item.progress === 0){
						gantt.templates.grid_row_class = function(start, end, task){ return  'planned';};
						gantt.templates.task_class = function(start, end, task){return "planned";};
						gantt.getTask(item.id).color = "rgb(11, 224, 240)"
						return "Planejado";
					}
					gantt.templates.grid_row_class = function(start, end, task){return  'in_progress';};
					gantt.templates.task_class = function(start, end, task){return "in_progress";};
					gantt.getTask(item.id).color = "#ccc"
					return 'Em andamento';
				}
			},
			{name:"add",        label:"" }
		];

		gantt.config.lightbox.sections = [
			{name: "description", height: 38, map_to: "text", type: "textarea", focus: true},
			{
				name: "progress", height: 22, map_to: "progress", type: "select", options: [
					{key: "0", label: "Planejado"},
					{key: "0.1", label: "10%"},
					{key: "0.2", label: "20%"},
					{key: "0.3", label: "30%"},
					{key: "0.4", label: "40%"},
					{key: "0.5", label: "50%"},
					{key: "0.6", label: "60%"},
					{key: "0.7", label: "70%"},
					{key: "0.8", label: "80%"},
					{key: "0.9", label: "90%"},
					{key: "1", label: "Concluído"}
				]
			},
			{name: "time", type: "time", map_to: "auto", time_format: ["%d", "%m", "%Y", "%H:%i"]}
		];

		gantt.init(this.ganttContainer.nativeElement);

		const dp = gantt.createDataProcessor({
			task: {
				update: (data: Task) => this.taskService.update(data),
				create: (data: Task) => this.taskService.insert(data),
				delete: (id: any) => this.taskService.remove(id)
			},
			link: {
				update: (data: Link) => this.linkService.update(data),
				create: (data: Link) => this.linkService.insert(data),
				delete: (id: any) => this.linkService.remove(id)
			}
		});

		Promise.all([this.taskService.get(), this.linkService.get()])
			.then(([data, links]) => {
				this.mq = data.filter(m => !m.parent);
				gantt.parse({ data });
			});
			
	}

	public onChangeMac(data: any) {
		let taskSearch = [];
	
		if(!this.dataTaskrecover.data.length){
			this.dataTaskrecover = gantt.serialize();
			taskSearch.push(gantt.getTask(this.selectedMac));
			taskSearch.push(gantt.getTask(gantt.getChildren(this.selectedMac)[0]));

			gantt.clearAll();
			gantt.parse({ tasks: taskSearch });
		} else {
			let data = this.dataTaskrecover.data;
			Promise.all([this.taskService.get(), this.linkService.get()])
			.then(([data, links]) => {
				if (this.selectedMac ) {
					let task = data.filter(m => m.id == parseInt(this.selectedMac))[0];
					let mqCh = data.filter(m => m.parent == parseInt(this.selectedMac))[0];
					taskSearch.push(task);
					taskSearch.push(mqCh);
					console.log('data', [task, mqCh])
					gantt.clearAll();
					gantt.parse({ tasks: [task, mqCh] });
				} else {
					gantt.clearAll();
					gantt.parse({ tasks: data });
				}
			});
		}
	}

	public onChangeStatus(data: any) {
		Promise.all([this.taskService.get(), this.linkService.get()])
			.then(([data, links]) => {
				let dataStatus = data.filter((status)=>{
					if (parseFloat(this.selectedStatus) >= 1) {
						return status.progress >= 1
					}
					if(parseFloat(this.selectedStatus) == 0){
						return status.progress == 0
					}
					if(parseFloat(this.selectedStatus)>0&&parseFloat(this.selectedStatus)<1){
						return status.progress> 0 && status.progress<1
					}

					return status.progress
					
				});
				gantt.clearAll();
				if (this.selectedStatus=="") {
					gantt.parse({ tasks: data });
				} else {
					gantt.parse({ tasks: dataStatus });
				}
			});
	}

	
}
