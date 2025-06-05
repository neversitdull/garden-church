import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { File, MapIcon } from "lucide-react";
import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      // Singleton for Navigation
      S.listItem()
        .title("Navigation")
        .id("navigation")
        .icon(MapIcon)
        .child(
          S.document()
            .schemaType("navigation")
            .documentId("navigation")
            .title("Site Navigation")
        ),
      // Divider
      S.divider(),
      // Orderable Pages
      orderableDocumentListDeskItem({
        type: "page",
        title: "Pages",
        icon: File,
        S,
        context,
      }),
      // All other document types (filtered to exclude navigation and page)
      ...S.documentTypeListItems().filter(
        (listItem) => !["navigation", "page"].includes(listItem.getId()!)
      ),
    ]);
