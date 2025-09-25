# Component Implementation SOP - Atomic Design Architecture

## Project Structure Overview

```
src/
├── components/
│   ├── atoms/           # Basic UI elements (Button, Typography, Input)
│   ├── molecules/       # Simple combinations (SearchBox, ProductCard)
│   ├── organisms/       # Complex sections (Header, Footer, ProductGrid)
│   ├── templates/       # Page layouts (MainLayout)
│   └── pages/          # Complete pages (HomePage)
├── core/modules/       # Page-specific logic
│   └── homepage/       # @homepage/ - Homepage-only constants/types
│       ├── constants.ts
│       ├── types.ts
│       └── utils.ts
└── shared/            # @shared/ - Project-wide reusable
    ├── constants.ts   # Global constants
    ├── types.ts      # Shared types
    └── utils.ts      # Common utilities
```

## Component Implementation Pattern

1. Import Dependencies (Direct Imports - No Index Files)

   ```tsx
   import React, { useState, useEffect } from "react";
   import Typography from "@/sharedComponents/typography/typography";
   import Button from "@/shared/components/button/button";
   import { IComponentProps } from "./component.interface";
   import { helperFunction } from "@/shared/utilities/common";
   import IconImage from "@/publicImages/icon.svg";
   ```

2. Define Interfaces and Types (Component-Specific)

   ```tsx
   interface IProps {
     title: string;
     description?: string;
     onClick?: (id: string) => void;
     className?: string;
   }

   // For atoms - extend base types
   interface ButtonProps extends BaseComponentProps {
     variant: "primary" | "secondary" | "outline";
     size?: "sm" | "md" | "lg";
     children: React.ReactNode;
   }
   ```

3. Initialize Component

   ```tsx
   const ComponentName = (props: IProps) => {
     const { title, description, onClick, className  } = props;

     // Component implementation
   ```

4. Manage State

   ```tsx
   const [isActive, setIsActive] = useState<boolean>(false);

   useEffect(() => {
     // Initialize or update state based on props
   }, [dependencyProp]);
   ```

5. Create Helper Functions

   ```tsx
   const formatData = (data: string): string => {
     // Logic to format data
     return formattedData;
   };
   ```

6. Create Render Methods

   ```tsx
   const renderSectionName = () => {
     return (
       <div className="flex items-center">
         <Typography variant="base" component="p">
           {title}
         </Typography>
       </div>
     );
   };
   ```

7. Implement Event Handlers

   ```tsx
   const handleClick = (event: React.MouseEvent<HTMLElement>) => {
     event.stopPropagation();
     onClick && onClick(id);
   };
   ```

8. Return JSX Structure

   ```tsx
   return (
     <div
       className={`flex flex-col bg-white rounded-xl ${className}`}
       onClick={handleClick}
     >
       {renderSectionName()}
       {condition && renderConditionalSection()}
     </div>
   );
   ```

9. Export Component
   ```tsx
   export default ComponentName;
   ```

## Atomic Design Guidelines

### Component Hierarchy

- **Atoms**: Basic UI elements (Button, Typography, Input, Icon)
- **Molecules**: Simple combinations (SearchBox, ProductCard, Logo)
- **Organisms**: Complex sections (Header, Footer, ProductGrid)
- **Templates**: Page layouts (MainLayout, DashboardLayout)
- **Pages**: Complete pages (HomePage, ProductsPage)

### Component Composition Rules

```tsx
// ✅ Atoms can only use HTML elements and other atoms
const Button = ({ children, ...props }) => (
  <button {...props}>
    <Typography variant="body">{children}</Typography>
  </button>
);

// ✅ Molecules use atoms and HTML elements
const SearchBox = () => (
  <div>
    <Input placeholder="Search..." />
    <Button variant="primary">Search</Button>
  </div>
);

// ✅ Organisms use molecules, atoms, and HTML elements
const Header = () => (
  <header>
    <Logo />
    <SearchBox />
    <CartIcon />
  </header>
);
```

## Constants & Types Management

### Scope-Based Organization

```tsx
// Page-specific (Homepage only)
import {
  MOCK_PRODUCTS,
  HOMEPAGE_CONFIG,
} from "@/core/modules/homepage/constants";
import { HomepageHeroProps } from "@/core/modules/homepage/types";

// Project-wide shared (Multiple pages/components)
import { FOOTER_SECTIONS, UI_CONSTANTS } from "@/shared/constants";
import { Product, Category, User } from "@/shared/types";
import { formatPrice, validateEmail } from "@/shared/utils";
```

### Decision Matrix: Where to Place Constants/Types

| **Scope**            | **Use Case**            | **Location**                                  | **Example**              |
| -------------------- | ----------------------- | --------------------------------------------- | ------------------------ |
| **Single Component** | Component-specific only | `components/atoms/button/button.constants.ts` | Button variants          |
| **Single Page**      | Page-specific only      | `@/core/modules/homepage/constants.ts`        | Homepage mock data       |
| **Multiple Pages**   | Project-wide shared     | `@/shared/constants.ts`                       | API endpoints, UI colors |

### Constants Structure

```tsx
// ✅ Shared constants (multiple components use)
export const UI_CONSTANTS = {
  COLORS: {
    primary: "#007BFF",
    secondary: "#6C757D",
  },
  BREAKPOINTS: {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
  },
} as const;

// ✅ Page-specific constants (homepage only)
export const HOMEPAGE_HERO_STATS = [
  { value: "10K+", label: "Products" },
  { value: "500+", label: "Sellers" },
];
```

### Types Structure

```tsx
// ✅ Shared domain types
export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

// ✅ Component-specific types
export interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

// ✅ Page-specific types
export interface HomepageHeroProps {
  stats: HeroStat[];
  onShopNow: () => void;
}
```

## Best Practices

### Styling

- Use Tailwind CSS for styling
- Group related classes together

### Component Design

- Keep components focused on single responsibilities
- Use conditional rendering for variants
- Create reusable, configurable components
- Pass className prop to allow customization

### Props and State

- Use TypeScript interfaces for type safety
- Provide default values for optional props
- Keep state minimal and focused

### Rendering Optimization

- Break complex components into smaller render methods
- Use conditional rendering effectively

### Event Handling

- Use proper event typing
- Implement stopPropagation when needed
- Create specific handler functions for different actions

### Accessibility

- Use semantic HTML elements
- Add ARIA attributes when necessary
- Support keyboard navigation

### Testing

- Create testable component logic
- Test atomic components in isolation
- Test organism-level integration

### Import Guidelines

- **Direct Imports Only**: No index.ts barrel files
- **Specific Paths**: Import from exact file locations
- **Scope Awareness**: Use @homepage/ for page-specific, @shared/ for project-wide
- **Component Hierarchy**: Follow atomic design import patterns

### File Naming Conventions

- **Components**: `component-name.tsx` (kebab-case)
- **Types**: `types.ts` or `component-name.types.ts`
- **Constants**: `constants.ts` or `component-name.constants.ts`
- **Utils**: `utils.ts` or `component-name.utils.ts`

### Path Aliases Setup

```typescript
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/shared/*": ["./src/shared/*"],
      "@/core/modules/*": ["./src/core/modules/*"],
      "@/components/*": ["./src/components/*"]
    }
  }
}
```

## Component Examples by Atomic Level

### Atom Example (Button)

```tsx
import React from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Button = ({ variant, children, onClick, className }: ButtonProps) => {
  const baseClasses = "px-4 py-2 rounded-lg font-semibold";
  const variantClasses =
    variant === "primary"
      ? "bg-blue-600 text-white"
      : "bg-gray-200 text-gray-800";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

### Molecule Example (ProductCard)

```tsx
import React from "react";
import Button from "@/components/atoms/button/button";
import Typography from "@/components/atoms/typography/typography";
import { Product } from "@/shared/types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (id: string) => void;
  className?: string;
}

const ProductCard = ({
  product,
  onAddToCart,
  className = "",
}: ProductCardProps) => {
  return (
    <div className={`border rounded-lg p-4 ${className}`}>
      <Typography variant="h3">{product.name}</Typography>
      <Typography variant="body">${product.price}</Typography>
      <Button variant="primary" onClick={() => onAddToCart(product.id)}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
```

### Organism Example (ProductGrid)

```tsx
import React from "react";
import ProductCard from "@/components/molecules/product-card/product-card";
import Typography from "@/components/atoms/typography/typography";
import { Product } from "@/shared/types";

interface ProductGridProps {
  title: string;
  products: Product[];
  onAddToCart: (id: string) => void;
  className?: string;
}

const ProductGrid = ({
  title,
  products,
  onAddToCart,
  className = "",
}: ProductGridProps) => {
  return (
    <section className={`py-8 ${className}`}>
      <Typography variant="h2" className="mb-6">
        {title}
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
```
