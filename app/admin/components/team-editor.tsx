"use client";

import { useState } from "react";
import { resolvePublicAssetSrc } from "@/lib/hero-slides";
import { ImageField } from "./image-field";

export type TeamMemberInput = {
  name: string;
  image: string;
  alt: string;
  bio: string;
};

type DraftMember = TeamMemberInput & { key: string };

type TeamEditorProps = {
  initial: TeamMemberInput[];
  basePath?: string;
};

function toDraft(members: TeamMemberInput[]): DraftMember[] {
  return members.map((member, index) => ({
    ...member,
    key: `team-${index}-${member.name}`,
  }));
}

export function TeamEditor({ initial, basePath = "" }: TeamEditorProps) {
  const [members, setMembers] = useState<DraftMember[]>(() => toDraft(initial));

  const updateMember = (
    key: string,
    patch: Partial<Pick<TeamMemberInput, "name" | "bio">>,
  ) => {
    setMembers((current) =>
      current.map((member) =>
        member.key === key ? { ...member, ...patch } : member,
      ),
    );
  };

  const removeMember = (key: string) => {
    setMembers((current) => current.filter((member) => member.key !== key));
  };

  const addMember = () => {
    setMembers((current) => [
      ...current,
      {
        key: `team-new-${Date.now()}`,
        name: "",
        bio: "",
        image: "",
        alt: "",
      },
    ]);
  };

  return (
    <div className="admin-team-editor">
      <div className="admin-team-editor-header">
        <h3>Equipo</h3>
        <button
          type="button"
          className="admin-btn admin-btn-secondary"
          onClick={addMember}
        >
          Agregar integrante
        </button>
      </div>

      {members.length === 0 ? (
        <p className="admin-item-meta">
          No hay integrantes. Agregá al menos uno para mostrar el equipo en el
          sitio.
        </p>
      ) : null}

      <div className="admin-team-list">
        {members.map((member, index) => {
          const resolved = member.image
            ? resolvePublicAssetSrc(member.image, basePath)
            : null;
          const needsPhoto = !member.image.trim();

          return (
            <article key={member.key} className="admin-team-card">
              <div className="admin-team-card-top">
                <p className="admin-item-meta">Integrante {index + 1}</p>
                <button
                  type="button"
                  className="admin-btn admin-btn-danger admin-btn-small"
                  onClick={() => removeMember(member.key)}
                >
                  Quitar
                </button>
              </div>

              <input
                type="hidden"
                name={`teamExistingImage-${index}`}
                value={member.image}
              />

              <label>
                Nombre
                <input
                  name={`teamName-${index}`}
                  value={member.name}
                  onChange={(event) =>
                    updateMember(member.key, { name: event.target.value })
                  }
                  required
                />
              </label>

              <label>
                Descripción
                <textarea
                  name={`teamBio-${index}`}
                  rows={4}
                  value={member.bio}
                  onChange={(event) =>
                    updateMember(member.key, { bio: event.target.value })
                  }
                  required
                />
              </label>

              <ImageField
                name={`teamImage-${index}`}
                label={needsPhoto ? "Foto" : "Reemplazar foto"}
                required={needsPhoto}
                existingSrc={resolved}
                existingCaption={
                  member.name
                    ? `Foto actual de ${member.name}`
                    : "Foto actual"
                }
                emptyHint="Elegí una foto para este integrante"
                variant="portrait"
              />
            </article>
          );
        })}
      </div>

      <input type="hidden" name="teamCount" value={members.length} />
    </div>
  );
}
