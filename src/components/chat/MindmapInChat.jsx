import { useMemo } from "react";
import { buildMindmapNodes } from "../../data/conciergeEngine";

/** @param {{ profile: Record<string, unknown> }} props */
export default function MindmapInChat({ profile }) {
  const tree = useMemo(() => buildMindmapNodes(profile), [profile]);

  if (!tree.children.length) {
    return (
      <div className="cn-chat-mindmap">
        <p className="cn-chat-mindmap__empty">
          아직 정리된 조건이 적어요. 큐레이션을 한 번 진행하거나, 원하는 휴식을 한두 문장으로 알려 주세요.
        </p>
      </div>
    );
  }

  return (
    <div className="cn-chat-mindmap cn-chat-mindmap__tree" role="img" aria-label="회복 조건 마인드맵 요약">
      <div className="cn-chat-mindmap__center">{tree.label}</div>
      <div className="cn-chat-mindmap__branches">
        {tree.children.map((branch) => (
          <div className="cn-chat-mindmap__branch" key={branch.id}>
            <span className="cn-chat-mindmap__branch-label">{branch.label}</span>
            <ul className="cn-chat-mindmap__leaves">
              {branch.leaves.map((leaf) => (
                <li key={leaf.id}>{leaf.label}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
