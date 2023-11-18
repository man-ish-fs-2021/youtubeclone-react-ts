import React, { Children, ElementType, ReactNode, useState } from "react";
import { buttonStyles } from "../../component/Button/ButtonStyles";
import { twMerge } from "tailwind-merge";
import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Home,
  Library,
  PlaySquare,
  Repeat,
  History,
  ListVideo,
  Flame,
  ShoppingBag,
  Music2,
  Film,
  Radio,
  Gamepad2,
  Newspaper,
  Trophy,
  Lightbulb,
  Shirt,
  Podcast,
} from "lucide-react";
import { Button } from "../../component";
import { playlists, subscriptions } from "../../data";
import { useSidebarContext } from "../../context/SidebarContext";
import { PageHeaderFirstSection } from "../PageHeader/PageHeader";

type SmallSidebarItemProps = {
  icon: ElementType;
  title: string;
  url: string;
};
type LargeSidebarItemProps = {
  iconOrImageUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};
type LargeSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};
const SmallSidebarItem = ({
  icon: Icon,
  title,
  url,
}: SmallSidebarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="tex-sm">{title}</div>
    </a>
  );
};
const LargeSidebarSection = ({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSidebarSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const childArr = Children.toArray(children).flat();
  const showExpandButton = childArr.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childArr
    : childArr.splice(0, visibleItemCount);
  console.log({ childArr, showExpandButton, children, le: childArr.length });
  const ButtonIcon = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          onClick={() => setIsExpanded((prev) => !prev)}
          variant="ghost"
          className="w-full flex items-center rounded-lg gap-4 p-3"
        >
          <ButtonIcon className="w-6 h-6" />
          <div>{isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
};
const LargeSidebarItem = ({
  iconOrImageUrl: Icon,
  title,
  url,
  isActive,
}: LargeSidebarItemProps) => {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : ""
        }`
      )}
    >
      {typeof Icon === "string" ? (
        <img src={Icon} className="w-6 h-6 rounded-full" />
      ) : (
        <Icon className="w-6 h-6" />
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
};

const Sidebar = () => {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1  ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        } `}
      >
        <SmallSidebarItem icon={Home} title="Home" url="/" />
        <SmallSidebarItem icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <SmallSidebarItem icon={Library} title="Library" url="/library" />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex-col gap-2 px-2 hidden ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <PageHeaderFirstSection />
        </div>
        <LargeSidebarSection>
          <LargeSidebarItem
            isActive
            iconOrImageUrl={Home}
            title="Home"
            url="/"
          />
          <LargeSidebarItem
            iconOrImageUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection visibleItemCount={5}>
          <LargeSidebarItem
            iconOrImageUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            iconOrImageUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            iconOrImageUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            iconOrImageUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              iconOrImageUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSidebarSection>
        <hr />
        <LargeSidebarSection title="Subscriptions">
          {subscriptions.map((eachSub) => {
            return (
              <LargeSidebarItem
                key={eachSub.id}
                iconOrImageUrl={eachSub.imgUrl}
                title={eachSub.channelName}
                url={`/@${eachSub.id}`}
              />
            );
          })}
        </LargeSidebarSection>
        <LargeSidebarSection title="Explore">
          <LargeSidebarItem
            iconOrImageUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            iconOrImageUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem
            iconOrImageUrl={Music2}
            title="Music"
            url="/music"
          />
          <LargeSidebarItem
            iconOrImageUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem iconOrImageUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            iconOrImageUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem
            iconOrImageUrl={Newspaper}
            title="News"
            url="/news"
          />
          <LargeSidebarItem
            iconOrImageUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            iconOrImageUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            iconOrImageUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            iconOrImageUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />{" "}
        </LargeSidebarSection>
      </aside>
    </>
  );
};

export default Sidebar;
