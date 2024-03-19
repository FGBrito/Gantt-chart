export function Locale(): any{
	let data = {
        date: {
            month_full: [  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            month_short: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            day_full: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            day_short: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        },
        labels: {
            new_task: "Nova tarefa",
            icon_save: "Salvar",
            icon_cancel: "Cancelar",
            icon_details: "Details",
            icon_edit: "Edit",
            icon_delete: "Apagar",
            gantt_save_btn: "New Label",
            gantt_cancel_btn: "New Label",
            gantt_delete_btn: "New Label",
            confirm_closing: "",// Your changes will be lost, are you sure?
            confirm_deleting: "A tarefa será excluída permanentemente, tem certeza?",
            section_description: "Descrição",
            section_time: "Inicio",
            section_type: "Type",
            section_progress: "Processos",
     
            /* grid columns */
            column_wbs: "WBS",
            column_text: "Task name",
            column_start_date: "Start time",
            column_duration: "Duration",
            column_add: "",
     
            /* link confirmation */
            link: "Link",
            confirm_link_deleting: "will be deleted",
            link_start: " (start)",
            link_end: " (end)",
     
            type_task: "Task",
            type_project: "Project",
            type_milestone: "Milestone",
     
            minutes: "Minutes",
            hours: "Hours",
            days: "Days",
            weeks: "Week",
            months: "Months",
            years: "Years",
     
            /* message popup */
            message_ok: "OK",
            message_cancel: "Cancelar",
     
            /* constraints */
            section_constraint: "Constraint",
            constraint_type: "Constraint type",
            constraint_date: "Constraint date",
            asap: "As Soon As Possible",
            alap: "As Late As Possible",
            snet: "Start No Earlier Than",
            snlt: "Start No Later Than",
            fnet: "Finish No Earlier Than",
            fnlt: "Finish No Later Than",
            mso: "Must Start On",
            mfo: "Must Finish On",
     
            /* resource control */
            resources_filter_placeholder: "type to filter",
            resources_filter_label: "hide empty"
        }
    }
    return data
}