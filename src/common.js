import { HEADER_TAGS, ALIGNMENTS } from "./settings";

export function rename_text_styles(old_settings, new_settings, document_data) {
    const shared_styles_by_name = new Map();
    document_data.layerTextStyles().sharedStyles().forEach(shared_style => {
        shared_styles_by_name.set(String(shared_style.name()), shared_style);
    });

    old_settings.breakpoint_labels.forEach((old_breakpoint_label, index) => {
        HEADER_TAGS.forEach(header_tag => {
            ALIGNMENTS.forEach(alignment => {
                const old_color = old_settings.naming_convention != "" ? old_settings.naming_convention : `#${old_settings.text_color !== undefined ? old_settings.text_color : new_settings.text_color}`;
                const old_style_name = `${old_breakpoint_label}/${header_tag}/${old_color}/${alignment}`;
                const shared_style = shared_styles_by_name.get(old_style_name);
                if (shared_style != null) {
                    const new_color = new_settings.naming_convention != "" ? new_settings.naming_convention : `#${new_settings.text_color}`;
                    const new_breakpoint_label = new_settings.breakpoint_labels[index];
                    const new_style_name = `${new_breakpoint_label}/${header_tag}/${new_color}/${alignment}`;
                    shared_style.name = new_style_name;
                }
            });
        });
    });
}