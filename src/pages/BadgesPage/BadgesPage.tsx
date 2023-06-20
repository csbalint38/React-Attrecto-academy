import { useEffect, useState } from "react";

import Page from "../../components/page/Page";
import Badge from "../../components/badge/Badge";
import { BadgeModel } from "../../models/badges.model";
import { badgeService } from "../../services/badges.service";

const BadgesPage = () => {
  const [badges, setBadges] = useState<BadgeModel[]>([]);

  useEffect(() => {
    const fetchBadges = async () => {
      setBadges(await badgeService.getBadges());
    };

    fetchBadges();
  }, []);

  return (
    <Page title="Badges">
      <div className="row">
        {badges.map((badge) => (
          <div key={badge.id} className="col-lg-4 col-md-6 col-sm-12">
            <Badge badge={badge} />
          </div>
        ))}
      </div>
    </Page>
  );
};

export default BadgesPage;
